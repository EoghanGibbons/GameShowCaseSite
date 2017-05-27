using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EoghanGibbons.Models
{
    public class UserViewModel
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public bool ContactMe { get; set; }
    }
}