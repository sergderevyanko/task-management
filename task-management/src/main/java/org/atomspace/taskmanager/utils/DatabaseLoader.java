package org.atomspace.taskmanager.utils;

import org.atomspace.taskmanager.domain.Project;
import org.atomspace.taskmanager.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner{
    private final ProjectRepository repository;

    @Autowired
    public DatabaseLoader(ProjectRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Project("Spring Hackaton", "ASSH", "A 3-days long " +
                "project aimed on building prod ready project"));
        this.repository.save(new Project("React Intro", "ASRI", "A project " +
                "aimed on getting hands-on experience with React and other tools"));
        this.repository.save(new Project("Java Guru", "ASJG", "A project " +
                "that help people learn how to build a complex systems with JAVA techological stack"));
    }
}