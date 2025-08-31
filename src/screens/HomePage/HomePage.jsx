import Header from "../../components/Header/Header";
import classes from "./HomePage.module.css";

export default function HomePage() {
    return (
        <>
            <Header></Header>
            <main>
                <div className={classes.welcome_img}>
                    <h1>Welcome To Our Technical Store!</h1>
                </div>
            </main>
        </>
    );
}
