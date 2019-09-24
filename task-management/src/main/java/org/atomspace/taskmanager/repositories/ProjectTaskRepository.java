package org.atomspace.taskmanager.repositories;

import org.atomspace.taskmanager.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository  extends CrudRepository<ProjectTask, Long> {
}
