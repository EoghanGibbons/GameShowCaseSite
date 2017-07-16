using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Repositories
{
    public class GenericGoogleDriveRepository
    {
        public async Task<string> GetFile()
        {
            return await new GoogleDriveAccess.Repository().Authenticate();
        }
    }
}

