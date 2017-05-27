using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using BuisnessLayer.Entities;
using SiteEntities.Repository;

namespace BuisnessLayer.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"> BuisnessLayer object </typeparam>
    /// <typeparam name="TU"> DAL layer object </typeparam>
    public class GenericRepository<T, TU> where T : Base<T, TU> , new() where TU : SiteEntities.Entities.Base.BaseModel<TU>
    {
        public async Task<T> Get(Expression<Func<TU, bool>> pred)
        {
            using (var dalRepo = new GenericRepository<TU>())
            {
                return await Task.Run(async() => await Base<T, TU>.CreateFromDal(await dalRepo.Get(pred)));
            }
        }
    }
}
