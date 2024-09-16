import { ReactNode, useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode | ReactNode[];
}

const ProtectedRoute = ({ children}: Props) => {
    const { isLogin } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin]);

    return <>{children}</>;
};

export default ProtectedRoute