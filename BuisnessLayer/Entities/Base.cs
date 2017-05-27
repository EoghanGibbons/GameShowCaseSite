using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Entities
{
    public abstract class Base<T, TU>
    {
        public static Task<T> CreateFromDal(TU dalVal)
        {
            throw new NotImplementedException("This base function should never be implemented");
        }
    }
}
