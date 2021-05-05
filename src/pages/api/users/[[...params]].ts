import {
  createHandler,
  Get as GetRoute,
  HttpException,
  NotFoundException,
  Param,
  UseMiddleware,
} from "@storyofams/next-api-decorators";
import { Get, Index, Lambda, Map, Match, Paginate } from "faunadb";
import { Paste } from "types/Paste";
import { client } from "@lib/faunadb";
import { User } from "types/User";
import { QueryData } from "types/Query";
import { Cors, Csurf } from "@lib/middlewares";

@UseMiddleware(Cors, Csurf)
class PastesRouter {
  @GetRoute("/:name")
  public async getUserByName(
    @Param("name") name: string,
  ): Promise<{
    pastes: Paste[];
    user: User;
  }> {
    const user = await client
      .query<QueryData<User>>(Get(Match(Index("get_user_by_name"), name)))
      .catch(() => null);

    if (!user?.data) {
      throw new NotFoundException("That user was not found");
    }

    const pastes = await client
      .query<any>(
        Map(
          Paginate(Match(Index("get_pastes_by_creator"), name)),
          Lambda((x) => Get(x)),
        ),
      )
      .catch(console.error);

    if (!pastes || typeof pastes === "function") {
      throw new HttpException(500, "An error occurred");
    }

    return {
      user: {
        ...user.data,
        id: user.ref.id,
      },
      pastes: pastes.data.map((paste: QueryData<Paste>) => ({
        ...paste.data,
        id: paste.ref?.id,
      })),
    };
  }
}

export default createHandler(PastesRouter);
