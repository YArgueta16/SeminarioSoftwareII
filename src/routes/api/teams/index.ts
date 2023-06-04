import express from 'express';
const router = express.Router();

import { createTeam, deleteTeam, getTeams, updateTeam, getTeam} from '@libs/teams/teams';

router.get('/', (_req, res) => {
  res.json({version:1, scope:'projects'});
});

//  /api/projects/echo/hola?variable1=a&variable2=b


router.get('/all', async (_req, res) => {
  try{
    const projects = await getTeams();
    res.json(projects);
  }
  catch(ex:any ){
    return res.status(500).json({error: ex?.message});
  }
});

router.post('/new', async (req, res) => {
  try{
    const { name = '',description='', members = '', owner='', status = false } = req.body;
    const newTeam = { name, description,members,owner, status: (status && true) };
    const createdTeam = await createTeam(newTeam);
    res.json(createdTeam);}
  catch(ex:any ){
    return res.status(500).json({error: ex?.message});

  }
});
router.put ('/upd/:id', async (req, res) =>{
   try{
    const {id= ''} = req.params;
    const {name= '',description='', members = '', owner='', status= false} = req.body;
    const updatedTeam = await updateTeam(id,{name,description,members,owner,status:(status&&true)});
    return res.json(updatedTeam); }
    catch(ex:any ){
      return res.status(500).json({error: ex?.message});
    }
  });
  router.delete('/del/:id', async (req, res) => {
    try{
      const {id=''} = req.params;
      const deletedProject = await deleteTeam(id);
      res.json({deleted: deletedProject, id});}
    catch(ex:any ){
      return res.status(500).json({error: ex?.message});
    }
  });

  router.get('/byid/:id',async (req, res) => {
    try{
      const {id =''} = req.params;
      const project = await getTeam(id);
      return res.json(project);
    }catch(ex:any ){
      return res.status(500).json({error: ex?.message});
    }

  });

export default router;