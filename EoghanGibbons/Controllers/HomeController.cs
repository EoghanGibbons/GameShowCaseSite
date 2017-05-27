using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using EoghanGibbons.Models;

namespace EoghanGibbons.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<ActionResult> SignUp()
        {
            var model = await Task.Run(() => new UserViewModel());

            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> SignUp(SignUpViewModel model)
        {
            return await Task.Run(() => RedirectToAction(""));
        }
    }
}