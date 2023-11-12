import { ToastAndroid } from "react-native";

const ToastEle = ({ msg }) => {
  ToastAndroid.showWithGravityAndOffset(
    msg,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};

export default ToastEle;
