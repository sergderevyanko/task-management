package org.atomspace.taskmanager.utils;

import org.atomspace.taskmanager.domain.Project;
import org.atomspace.taskmanager.domain.ProjectTask;
import org.atomspace.taskmanager.services.ProjectService;
import org.atomspace.taskmanager.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final ProjectService projectService;

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    public DatabaseLoader(ProjectService projectService) {
        this.projectService = projectService;
    }



    @Override
    public void run(String... strings) throws Exception {
        List<Project> projects = new ArrayList<>();
        projects.add(new Project("Spring Hackaton", "ASSH", "A 3-days long " +
                "project aimed on building prod ready project"));
        projects.add(new Project("React Intro", "ASRI", "A project " +
                "aimed on getting hands-on experience with React and other tools"));
        projects.add(new Project("Java Guru", "ASJG", "A project " +
                "that help people learn how to build a complex systems with JAVA techological stack"));
        for(Project project: projects){
            this.projectService.saveOrUpdateProject(project);
            for(int i=0; i<4; i++){
                generateProjectTask(project.getProjectIdentifier());
            }
        }
    }

    private void generateProjectTask(String projectIdentifier){
        ProjectTask taskToAdd = new ProjectTask();
        taskToAdd.setSummary("A Task for project: " + projectIdentifier);
        projectTaskService.addProjectTask(projectIdentifier, taskToAdd);
    }
}