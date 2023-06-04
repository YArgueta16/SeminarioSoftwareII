export  interface ITeams {
    _id?: string;
    name: string;
    description: string;
    members?: string[];
    owner?: string;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }


  
  // const newProject: Required<IProject> = {};
  const memoryTeams: ITeams[] = [];
  let createdTeams = 0;
  
  export const createTeam = async (team: ITeams) => {
    const newTeam = { ...team };
    newTeam._id = (++createdTeams).toString();
    newTeam.createdAt = new Date();
    newTeam.updatedAt = newTeam.createdAt;
    memoryTeams.push(newTeam);
    return newTeam;
  }

  export const getTeams = async () => {
    return memoryTeams;
  };

  export const getTeam = async (id:string) =>{
    const team = memoryTeams.find(p => p._id === id);
    if(!team) throw new Error('Team not found');
    return team;
  }

  export const updateTeam = ( id:string, team:Partial<ITeams>) => {
    
    const index = memoryTeams.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Team not found');
    memoryTeams[index] = { ...memoryTeams[index], ...team, updatedAt: new Date() };
    return memoryTeams[index];
  }

  export const deleteTeam = (id:string) => {
    const index = memoryTeams.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Team not found');
    memoryTeams.splice(index, 1);
    return true;
  }
  