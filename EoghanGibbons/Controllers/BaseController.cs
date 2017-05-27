using BuisnessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using BuisnessLayer.Repositories;

namespace EoghanGibbons.Controllers
{
    public class BaseController : Controller
    {
        public BaseController()
        {
            this.Repository = new Repository();
        }

        protected Repository Repository;
        public User CurrentUser;

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            Task.Run(() => this.OnActionExecutingAsync(filterContext));
        }

        private async Task OnActionExecutingAsync(ActionExecutingContext context)
        {
            this.CurrentUser = await Repository.Users.Get(m => m.Id == 1);

            ViewBag.CurrentUser = this.CurrentUser.FullName;
        }
    }
}