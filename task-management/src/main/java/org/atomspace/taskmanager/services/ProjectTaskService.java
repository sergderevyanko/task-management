package org.atomspace.taskmanager.services;

import org.atomspace.taskmanager.domain.Backlog;
import org.atomspace.taskmanager.domain.ProjectTask;
import org.atomspace.taskmanager.exceptions.ProjectNotFoundException;
import org.atomspace.taskmanager.repositories.BacklogRepository;
import org.atomspace.taskmanager.repositories.ProjectRepository;
import org.atomspace.taskmanager.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        // Implementation considerations
        // 1. PTs to be added to a specific project, project! = null, BL exists
        // 2. set the bl to pt
        // 3. we want our project sequence to be like this: IDPRO-1, IDPRO-2 ... IDPRO-100
        // 4. Update BL SEQUENCE
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

        if(backlog == null){
            throw new ProjectNotFoundException("Project " + projectIdentifier + " not found");
        }

        projectTask.setBacklog(backlog);
        Integer backlogSequence = backlog.getPTSequence();
        backlog.setPTSequence(++backlogSequence);

        projectTask.setProjectSequence(backlog.getProjectIdentifier() + "-" + backlogSequence);
        projectTask.setProjectIdentifier(backlog.getProjectIdentifier());

        //INITIAL priority when priority is null
        if(projectTask.getPriority() == null || projectTask.getPriority() == 0 ){
            //replace 3 with constant or enum
            projectTask.setPriority(3);
        }
        //INITIAL status when priority is null
        if(projectTask.getStatus() == null || projectTask.getStatus().isEmpty()){
            //replace with Enum
            projectTask.setStatus("TODO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public List<ProjectTask> findBacklogById(String projectIdentifier) {
        if(projectRepository.findByProjectIdentifier(projectIdentifier) == null ){
            throw new ProjectNotFoundException("Project " + projectIdentifier + " not found");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }
}
