import express from 'express';
const router = express.Router();

import { createProject, deleteProject, getProjects, updateProject } from '@libs/projects/projects';

router.get('/', (_req, res) => {
  res.json({version:1, scope:'projects'});
});

//  /api/projects/echo/hola?variable1=a&variable2=b

router.get('/echo/:msg', (req, res) => {
  const { msg } = req.params;
  const { variable1='Hola', variable2='Mundo' } = req.query;
  res.json({msg, variable1, variable2});
});

router.post('/echo2', (req, res) => {
  const { variable1='Hola', variable2='Mundo' } = req.body;
  res.json({ variable1, variable2});
});

router.get('/all', async (_req, res) => {
  const projects = await getProjects();
  res.json(projects);
});

router.post('/new', async (req, res) => {
  const { name = '', description = '', isActive = false } = req.body;
  const newProject = { name, description, isActive: (isActive && true) };
  const createdProject = await createProject(newProject);
  res.json(createdProject);
});
router.put ('/upd/:id', async (req, res) => {
   const {id= ''} = req.params;
   const {name= '', description = '', isActive= false} = req.body;
   const updatedProject = await updateProject(id,{name,description,isActive:(isActive&&true)});
   return res.json(updatedProject) 
  });
  router.delete('/del/:id', async (req, res) => {
    const {id=''} = req.params;
    const deletedProject = await deleteProject(id);
    res.json({deleted: deletedProject, id});
  });

export default router;