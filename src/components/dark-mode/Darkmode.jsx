import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@redux/reducers/global";
import "./Darkmode.css"

const Darkmode = () => {
    const dispatch = useDispatch();
    const theme_params = useSelector((state) => state.global.theme);
    const { theme, state } = theme_params


    const handleToggle = (e) => {
        let checked = e.target.checked;
        let theme = checked ? "dark" : "light";
        let params = {
            "theme": theme,
            "state": checked
        }
        dispatch(setTheme(params))
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className={theme === "dark" ? "icon-darkmode" : "icon-lightmode"}>
                <span className="material-symbols-outlined p-2">
                    light_mode
                </span>
            </div>
            <label className="switch">
                <input type="checkbox" onChange={handleToggle} checked={state} />
                <span className="slider round"></span>
            </label>
            <div className={theme === "light" ? "icon-lightmode" : "icon-darkmode"}>
                <span className="material-symbols-outlined p-2" >
                    dark_mode
                </span>
            </div>
        </div>
    );
}

export default Darkmode;