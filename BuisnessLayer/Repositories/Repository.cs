using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Repositories
{
    public class Repository
    {
        private UserRepository _users;
        public UserRepository Users => this._users ?? (this._users = new UserRepository());


    }
}
