import { MessageSquare, Users } from "lucide-react"
import { useParams } from "next/navigation"
import { useMemo } from "react"

export const useNavigation = () => {
    const pathname = useParams()

    const paths = useMemo(() => [
        {
            name: "Conversations",
            href: "/conversations",
            icon: <MessageSquare />,
            active: pathname.startWith("/conversations")
        },
        {
            name: "Friends",
            href: "/friends",
            icon: <Users />,
            active: pathname === "/friends"
        },
    ],
    [pathname]
    );
    
    return paths;
};