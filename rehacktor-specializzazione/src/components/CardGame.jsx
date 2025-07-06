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

      <CardBody className="py-4 px-4 space-y-2">
        <h3 className="text-lg text-center font-semibold">{game.name}</h3>

        {game.genres && (
          <div className="flex justify-center flex-wrap gap-1">
            {game.genres.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {g.name}
              </span>
            ))}
          </div>
        )}
      </CardBody>

      <CardFooter className="flex justify-between items-center bg-white/60 px-4 py-2">
        <span className="text-sm text-gray-500">
          Released: {game.released}
        </span>
        <Link to={`/games/${game.slug}/${game.id}`}>
          <Button size="sm">See Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}