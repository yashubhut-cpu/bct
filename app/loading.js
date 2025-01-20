import { Ellipsis } from "react-css-spinners";

export default function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* Replace Container with a div or a valid component */}
            <div>
                <Ellipsis color="rgba(81,119,255,1)" size={100} />
            </div>
        </div>
    );
}
