"use client";

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
                <Card/>
            </div>
        </div>
    );
}

function Card(){
    return (
        <div
                    style={{
                        backgroundImage: "url('/pokedex.svg')",
                        minWidth: "300px",
                        minHeight: "300px", // Ensure the div has some height
                        backgroundSize: "contain", // Ensure the background image is contained within the div
                        backgroundRepeat: "no-repeat", // Ensure the background image does not repeat
                    }}
        >

        </div>
    )
}