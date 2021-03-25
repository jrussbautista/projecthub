import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UserService } from "services/user-service";
import Typography from "@material-ui/core/Typography";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import ProjectList from "components/project/ProjectList";
import UserDetails from "components/user/UserDetails";
import Meta from "components/meta";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
  },
  heading: {
    marginBottom: 20,
  },
}));

const UserPage = ({
  user,
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Meta title={user.name} />
      <UserDetails user={user} />
      <Typography variant="h5" className={classes.heading}>
        Projects
      </Typography>
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <Typography variant="h6" className={classes.emptyText}>
          Projects is still empty.
        </Typography>
      )}
    </Container>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const user = await UserService.getUser(id as string);
  const projects = await UserService.getUserProjects(id as string);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
      projects,
    },
  };
};
