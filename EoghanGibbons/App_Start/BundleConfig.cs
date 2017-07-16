using System.Web;
using System.Web.Optimization;

namespace EoghanGibbons
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/bower_components/jquery/dist/jquery.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/bower_components/jquery-validation/dist/jquery.validate.*"));
            
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/bower_components/modernizer/modernizr.js"));

            bundles.Add(new ScriptBundle("~/bundles/Underscore").Include("~/bower_components/underscore/underscore.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/bower_components/bootstrap/dist/js/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/ng-ws").Include(
                "~/bower_components/ng-wg/ng-ws.js"));

            bundles.Add(new ScriptBundle("~/GameLibrary").IncludeDirectory("~/Content/Games/Library", "*.js", true));

            bundles.Add(new ScriptBundle("~/Phaser").Include(
                "~/bower_components/phaser-ce/build/pixi.js",
                "~/bower_components/phaser-ce/build/phaser.js",
                "~/bower_components/phaser-ce/build/p2.js"
            ));

            bundles.Add(new ScriptBundle("~/Games/Breakout").IncludeDirectory("~/Content/Games/MultiplayerBreakout", "*.js", true));
        }
    }
}
