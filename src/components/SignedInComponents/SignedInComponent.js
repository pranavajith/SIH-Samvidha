const SignedInComponent = () => {
  const { user } = useContext(UserContext);
  console.log("Logged in!");
  console.log(user);
};

export { SignedInComponent };
