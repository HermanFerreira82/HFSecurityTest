// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiResource> ApiResources =>
            new ApiResource[]
            {
                new ApiResource("api1", "My API 1")
                {
                    Scopes = new List<string>()
                    {
                        "api1",
                    }
                }
            };


        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("api1", new List<string>() {"profile"}),
                new ApiScope("api2"),
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                // interactive client using code flow + pkce
                new Client
                {
                    ClientId = "ReactTestWebApp",
                    ClientName = "React Test WebApp",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,
                    RequireConsent = false,

                    AllowedScopes = new List<string> {"openid", "profile", "api1"},
                    RedirectUris = { "https://localhost:44335/signin-oidc" },
                    FrontChannelLogoutUri = "https://localhost:44335/signout-oidc",
                    PostLogoutRedirectUris = { "https://localhost:44335/signout-callback-oidc" },
                    AllowedCorsOrigins = new List<string> {"https://localhost:44335"},
                    AllowAccessTokensViaBrowser = true
                },
            };
    }
}