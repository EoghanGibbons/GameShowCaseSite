using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiteEntities.Entities.Interfaces;

namespace BuisnessLayer.Entities
{
    public class User : Base<User, SiteEntities.Entities.User>
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        
        public new Task<User> CreateFromDal(SiteEntities.Entities.User dalVal)
        {
            return Task.Run(() => new User()
            {
                FullName = $"{dalVal.FirstName} {dalVal.SecondName}",
                UserName = dalVal.UserName
            });
        }
    }
}
