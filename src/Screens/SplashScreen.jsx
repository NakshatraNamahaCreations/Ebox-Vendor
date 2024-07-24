import AnimatedSplash from "react-native-animated-splash-screen";
 
render() {
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#262626"}
        logoHeight={150}
        logoWidth={150}
      >
        <App />
      </AnimatedSplash>
    );
  }