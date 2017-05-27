using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using EoghanGibbons.Models.Games;

namespace EoghanGibbons.Controllers
{
    public class GamesController:Controller
    {
        [HttpGet]
        public async Task<ActionResult> List()
        {
            var model = new GameListViewModel();


            return View(model);
        }

        [HttpGet]
        public async Task<ActionResult> Game(string gameTitle)
        {
            var model = new GameViewModel();

            return View(model);
        }
    }
}