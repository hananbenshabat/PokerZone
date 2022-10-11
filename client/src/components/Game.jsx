import { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useStore } from "react-redux";
import "../style.css";

const buildUrl = "WebGLBuild";

export default function Game({ onUpdate }) {
  const store = useStore();
  let currState = store.getState();
  const [avatarData, setAvatarData] = useState(null);
  const [totalChips, setTotalChips] = useState(null);
  const [userData, setUserData] = useState(currState.auth.user);

  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    loadingProgression,
    isLoaded,
    sendMessage,
  } = useUnityContext({
    loaderUrl: buildUrl + "/PokerZone.loader.js",
    dataUrl: buildUrl + "/PokerZone.data.unityweb",
    frameworkUrl: buildUrl + "/PokerZone.framework.js.unityweb",
    codeUrl: buildUrl + "/PokerZone.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    productName: "PokerZone",
    companyName: "Hanan Ben Shabat",
    productVersion: "0.1",
    // Additional configuration options.
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const handleSaveAvatar = useCallback((aData) => {
    let parsedData, tempUser;
    if (aData !== null) {
      parsedData = JSON.parse(aData);
    }
    if (currState.auth.user !== null && parsedData !== null) {
      tempUser = userData;
      tempUser.player.avatar = parsedData;
    }
    if (tempUser != null) {
      onUpdate(tempUser);
    }
  }, []);

  const handleSaveTotalChips = useCallback((aData) => {
    let tempUser;
    if (currState.auth.user !== null && aData !== null) {
      tempUser = userData;
      tempUser.player.totalChips = aData;
    }
    if (tempUser != null) {
      onUpdate(tempUser);
    }
  }, []);

  useEffect(() => {
    currState = store.getState();

    if (currState.auth.user.player.avatar != null) {
      setAvatarData(currState.auth.user.player.avatar);
    }

    if (currState.auth.user.player.totalChips != null) {
      setTotalChips(currState.auth.user.player.totalChips);
    }
  }, []);

  useEffect(() => {
    if (currState.auth.user !== null && avatarData !== null) {
      let tempUser = userData;
      tempUser.player.avatar = avatarData;
      setUserData(tempUser);
    }
  }, [avatarData]);

  useEffect(() => {
    if (currState.auth.user !== null && totalChips !== null) {
      let tempUser = userData;
      tempUser.player.totalChips = totalChips;
      setUserData(tempUser);
    }
  }, [totalChips]);

  useEffect(() => {
    if (isLoaded && currState.auth != null) {
      sendMessage("Database", "SetUserData", JSON.stringify(userData.email));
      sendMessage("Database", "SetUserData", JSON.stringify(userData.name));
      sendMessage(
        "Database",
        "SetUserData",
        JSON.stringify(userData.player.rating)
      );
      sendMessage(
        "Database",
        "SetUserData",
        JSON.stringify(userData.player.totalGames)
      );
      sendMessage(
        "Database",
        "SetUserData",
        JSON.stringify(userData.player.totalChips)
      );
      sendMessage(
        "Database",
        "SetUserData",
        JSON.stringify(userData.player.isInTable)
      );
      sendMessage(
        "Database",
        "SetUserData",
        JSON.stringify(userData.player.avatar)
      );
    }
  }, [userData, isLoaded]);

  useEffect(() => {
    addEventListener("AvatarImport", handleSaveAvatar);

    return () => {
      removeEventListener("AvatarImport", handleSaveAvatar);
    };
  }, [addEventListener, handleSaveAvatar, removeEventListener]);

  useEffect(() => {
    addEventListener("TotalChipsImport", handleSaveTotalChips);

    return () => {
      removeEventListener("TotalChipsImport", handleSaveTotalChips);
    };
  }, [addEventListener, handleSaveTotalChips, removeEventListener]);

  return (
    <Fragment>
      <div className="wrapper">
        {/* The Unity container */}
        {
          <Fragment>
            <div className="unity-fullscreen-button" />
            <div className="unity-container">
              {/* The loading screen will be displayed here. */}
              {isLoaded === false && (
                <div className="loading-overlay">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: loadingProgression * 100 + "%" }}
                    />
                  </div>
                </div>
              )}
              {/* The Unity app will be rendered here. */}
              <Unity
                unityProvider={unityProvider}
                className="unity-canvas"
                matchWebGLToCanvasSize={true}
              />
            </div>
          </Fragment>
        }
      </div>
    </Fragment>
  );
}
