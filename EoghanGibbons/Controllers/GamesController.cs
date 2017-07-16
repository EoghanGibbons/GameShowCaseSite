using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using EoghanGibbons.Models.Games;

namespace EoghanGibbons.Controllers
{
    public class GamesController: BaseController
    {
        [HttpGet]
        public async Task<ActionResult> List()
        {
            var model = new GameListViewModel("result");


            return View(model);
        }

        [HttpGet]
        public async Task<ActionResult> Game(string gameTitle)
        {

            var obj = new
            {
                Hello = "world",
                World = "hello "
            };

            var model = new GameViewModel()
            {
                UserGameData = Newtonsoft.Json.JsonConvert.SerializeObject(obj)
            };

            return View(model);
        }
    }
}