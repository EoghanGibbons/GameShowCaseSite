using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteEntities.Entities.Base
{
    public abstract class BaseModel<T>
    {
        public abstract Task Update(T updated);
    }
}
