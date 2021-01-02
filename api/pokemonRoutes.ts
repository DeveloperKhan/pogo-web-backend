import e from "express";
import p from "../data/pokemon.json";
import c from 'cors';

const cors: any = c();

const pokemon: any = p;
const router = e.Router();

// @desc Get an array of Pokemon names to be used for the search feature
// @route GET /api/pokemon/name
// @access Public (for now)
router.get('/names', cors, (req, res) => {
    try{
        res.json(Object.keys(pokemon).map((mon: any) => {
            return pokemon[mon].speciesName
        }));
    }catch(err){
        console.error();
        res.status(500).json({message: "Internal server error"});
    }
});

// @desc Get a single pokemon by id (formatted as speciesId)
// @route GET /api/pokemon/:id
// @access Public (for now)
router.get('/:id', cors, (req, res) => {
    try{
        const result: any = pokemon[req.params.id];
        result ? res.json(result) : res.status(404).json(`Could not find Pokemon of id: ${req.params.id}`);
    }catch(err){
        console.error();
        res.status(500).json({message: "Internal server error"});
    }
});

export default router;