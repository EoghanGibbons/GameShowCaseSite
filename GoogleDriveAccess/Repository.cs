using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Newtonsoft.Json;

namespace GoogleDriveAccess
{
    public class Repository
    {
        public async Task<string> Authenticate()
        {
            using (StreamReader r = new StreamReader("/projects/GameShowCaseSite/GoogleDriveAccess/ServiceAccount.json"))
            {
                string json = await r.ReadToEndAsync();
                
                string[] scopes = new string[] { DriveService.Scope.Drive, DriveService.Scope.DriveFile };
             
                var client =
                    GoogleClientSecrets.Load(
                        new StreamReader("/projects/GameShowCaseSite/GoogleDriveAccess/client_secret.json").BaseStream);

                var credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(client.Secrets, scopes,
                    Environment.UserName, CancellationToken.None);

                var service = new DriveService(
                    new BaseClientService.Initializer()
                    {
                        HttpClientInitializer = credential,
                        ApplicationName = "EoghanGibbons"
                    }
                );

                var request =  service.Files.List();

                request.PageSize = 20;

                try
                {

                    var list = await request.ExecuteAsync();

                    return list.Files.First().Id;
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
        }
    }
}
