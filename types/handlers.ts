import { Team, TeamMember } from "./team";

export interface OnGetOpponentPayload {
  room: string,
}

export interface OnNewRoomPayload {
  room: string,
  team: TeamMember[]
}

export interface OnReadyGamePayload {
  room: string,
}

export interface OnTeamSubmitPayload {
  room: string,
  team: Team
}

export interface OnActionProps {
  id: string,
  room: string,
  data: string
}

export interface Update {
  id: string,
  active: number,
  hp?: number,
  shouldReturn?: boolean,
  remaining?: number,
  wait?: number
}

export interface ResolveTurnPayload {
  time: number,
  update: [Update | null, Update | null],
  switch: number
}