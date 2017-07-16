using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EoghanGibbons.Models.Games
{
    public class GameListViewModel
    {
        public GameListViewModel(string heading)
        {
            Heading = heading;
        }

        public string Heading { get; set; }
    }
}