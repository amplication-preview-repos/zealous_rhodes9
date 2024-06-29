/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { PromoCode } from "./PromoCode";
import { PromoCodeCountArgs } from "./PromoCodeCountArgs";
import { PromoCodeFindManyArgs } from "./PromoCodeFindManyArgs";
import { PromoCodeFindUniqueArgs } from "./PromoCodeFindUniqueArgs";
import { DeletePromoCodeArgs } from "./DeletePromoCodeArgs";
import { PromoCodeService } from "../promoCode.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => PromoCode)
export class PromoCodeResolverBase {
  constructor(
    protected readonly service: PromoCodeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "PromoCode",
    action: "read",
    possession: "any",
  })
  async _promoCodesMeta(
    @graphql.Args() args: PromoCodeCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [PromoCode])
  @nestAccessControl.UseRoles({
    resource: "PromoCode",
    action: "read",
    possession: "any",
  })
  async promoCodes(
    @graphql.Args() args: PromoCodeFindManyArgs
  ): Promise<PromoCode[]> {
    return this.service.promoCodes(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => PromoCode, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PromoCode",
    action: "read",
    possession: "own",
  })
  async promoCode(
    @graphql.Args() args: PromoCodeFindUniqueArgs
  ): Promise<PromoCode | null> {
    const result = await this.service.promoCode(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => PromoCode)
  @nestAccessControl.UseRoles({
    resource: "PromoCode",
    action: "delete",
    possession: "any",
  })
  async deletePromoCode(
    @graphql.Args() args: DeletePromoCodeArgs
  ): Promise<PromoCode | null> {
    try {
      return await this.service.deletePromoCode(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
