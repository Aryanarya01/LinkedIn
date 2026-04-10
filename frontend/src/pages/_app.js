import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
   <Provider>
    return <Component {...pageProps} />;
   </Provider>
}
