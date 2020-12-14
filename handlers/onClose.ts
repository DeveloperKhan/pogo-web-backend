import to from "../actions/to";
import { onlineClients, rooms } from "../server";
import { CODE } from "../types/actions";
import { RoomStatus } from "../types/room";

function onClose(id: string, room: string) {
  onlineClients.delete(id);
  const currentRoom = rooms.get(room);
  if (currentRoom) {
      if (currentRoom.players) {
          const index = currentRoom.players.findIndex(x => x && x.id === id);
          currentRoom.players[index] = null;
          currentRoom.status = RoomStatus.SELECTING;
          to(room, JSON.stringify({
              type: CODE.room_leave,
          }), );
          console.info(`Socket ${id} has been removed from room ${room}.`);
      }

      if (currentRoom.players[1] === null && currentRoom.players[0] === null) {
          rooms.delete(room);
          console.info(`Room ${room} has been deleted.`);
      }
  }

  console.info(`Socket ${id} has disconnected.`);
}

export default onClose;
