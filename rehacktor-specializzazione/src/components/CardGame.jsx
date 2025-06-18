import { Link } from "react-router";
import LazyLoadGameImage from "./LazyLoadGameImage";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";

export default function CardGame({ game }) {
    
    const genres = game.genres.map((genre) => genre.name).join(', ');
    
    return ( 
        <Card
        isHoverable
        shadow="md"
        radius="lg"
        isFooterBlurred
        className="max-w-sm"
        >
        <CardHeader className="p-0">
        <LazyLoadGameImage
        image={game.background_image}
        className="h-48 w-full object-cover rounded-t-lg"
        />
        </CardHeader>
        
        <CardBody className="py-4 px-4">
        <h3 className="text-lg font-semibold">{game.name}</h3>
        {genres && (
            <p className="mt-1 text-sm text-gray-500">
            {genres}
            </p>
        )}
        <p className="mt-1 text-sm text-gray-500">
        Released: {game.released}
        </p>
        </CardBody>
        
        <CardFooter className="flex justify-center bg-white/60">
        <Link to={`/games/${game.slug}/${game.id}`}>
        <Button size="sm">See Details</Button>
        </Link>
        </CardFooter>
        </Card>
    );
}