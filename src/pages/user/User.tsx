import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserService } from "services/user-service";
import Alert from "@material-ui/lab/Alert";
import { User } from "types/User";
import { Status } from "types/Status";
import { Project } from "types/Project";
import UserProjects from "./UserProjects";
import UserDetails from "./UserDetails";
import Meta from "components/meta";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  loadingContainer: {
    textAlign: "center",
  },
}));

interface Params {
  id: string;
}

const UserPage = () => {
  const classes = useStyles();
  const { id } = useParams<Params>();

  const [userStatus, setUserStatus] = useState<Status>("idle");
  const [userProjectStatus, setUserProjectStatus] = useState<Status>("idle");
  const [user, setUser] = useState<User | null>(null);
  const [userProjects, setUserProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await UserService.getUser(id);
        setUser(result);
        setUserStatus("success");
      } catch (error) {
        setUserStatus("error");
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const results = await UserService.getUserProjects(id);
        setUserProjects(results);
        setUserProjectStatus("success");
      } catch (error) {
        setUserProjectStatus("error");
      }
    };
    fetchUserProjects();
  }, [id]);

  if (userStatus === "idle") {
    return (
      <Container className={classes.container}>
        <div className={classes.loadingContainer}>
          <CircularProgress size={30} />
        </div>
      </Container>
    );
  }

  if (userStatus === "error" || !user) {
    return (
      <Container className={classes.container}>
        <Alert severity="error">
          Unable to load user details right now. Please try again later.
        </Alert>
      </Container>
    );
  }

  const renderUserProjectsSection = () => {
    if (userProjectStatus === "idle") {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress size={30} />
        </div>
      );
    }

    if (userProjectStatus === "error") {
      <Alert severity="error">
        Unable to load user projects right now. Please try again later.
      </Alert>;
    }

    return <UserProjects projects={userProjects} />;
  };

  return (
    <Container className={classes.container}>
      <Meta title={user.name} />
      <UserDetails user={user} />
      {renderUserProjectsSection()}
    </Container>
  );
};

export default UserPage;
