using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SiteEntities.Repository
{
    public class GenericRepository<T> : IDisposable where T : class
    {
        public async Task<T> Get(Expression<Func<T, bool>> pred)
        {
            using (var context = new Entities.Entities())
            {
                return await context.Set<T>().SingleOrDefaultAsync(pred);
            }
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            using (var context = new Entities.Entities())
            {
                return await context.Set<T>().ToListAsync();
            }
        }

        public async Task<IEnumerable<T>> Find(Expression<Func<T, bool>> pred)
        {
            using (var context = new Entities.Entities())
            {
                return await context.Set<T>().Where(pred).ToListAsync();
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
