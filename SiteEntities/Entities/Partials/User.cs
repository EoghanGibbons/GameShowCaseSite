using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiteEntities.Entities.Base;
using SiteEntities.Entities.Interfaces;

namespace SiteEntities.Entities
{
    public partial class User : BaseModel<User>, IUser
    {
        public override async Task Update(User updated)
        {
            await Task.Run(() =>
            {

            });
        }
    }
}
