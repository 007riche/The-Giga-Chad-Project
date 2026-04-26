import { useState } from "react";
import EmptyProjectContent from "./components/EmptyProjectContent";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleAddTask(taskText) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: taskText,
        id: taskId,
        projectId: prevState.selectedProjectId,
      }

      return {
        ...prevState,
        tasks: [
          ...prevState.tasks,
          newTask,
        ],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks
          .filter((task) => task.id !== taskId)
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects
          .filter((project) => project.id !== prevState.selectedProjectId)
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [
          ...prevState.projects,
          newProject,
        ],
      };
    });
  }

  const selectedProject = projectsState.projects
    .find(project => project.id === projectsState.selectedProjectId);

  let mainContent = <SelectedProject
    project={selectedProject}
    onDeleteProject={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}
  />;

  if (projectsState.selectedProjectId === null) {
    mainContent = <NewProject
      onAdd={handleAddProject}
      onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    mainContent = <EmptyProjectContent
      onStartAddProject={handleStartAddProject} />;
  }

  // console.log(projectsState);
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {mainContent}
    </main>
  );
}

export default App;
