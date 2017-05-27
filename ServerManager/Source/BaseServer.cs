using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ServerManager.Interfaces;

namespace ServerManager.Source
{
    public abstract class BaseServer : IServer
    {
        private List<Socket> Clients;
        private TcpListener Listener;

        protected BaseServer()
        {

        }

        public virtual async Task Start()
        {
            
        }

        public virtual async Task Connect()
        {
            await Task.Run(() =>
            {

            });
        }
    }
}
