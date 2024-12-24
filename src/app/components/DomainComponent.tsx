"use client";
import Tablet from "./Tablet";
export default function DomainComponent() {
    return (
        <div
            style={{
                backgroundImage: "url('/intro1.svg')",
                backgroundPosition: "50% 0",
                backgroundRepeat: "repeat-x",
                backgroundSize: "33px",
                backgroundAttachment: "scroll",
                paddingBottom: 0,
                minHeight: "100vh",
                backgroundColor: "#22B14C",
            }}
        >
            <div className="flex flex-row items-center justify-center h-screen">
                <Tablet/>
            </div>
        </div>
    );
}

