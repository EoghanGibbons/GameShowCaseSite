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

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/bower_components/bootstrap/dist/js/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/ng-ws").Include(
                "~/bower_components/ng-wg/ng-ws.js"));

            bundles.Add(new ScriptBundle("~/Games/Breakout").IncludeDirectory("~/Content/Games/MultiplayerBreakout", "*.js"));
        }
    }
}
