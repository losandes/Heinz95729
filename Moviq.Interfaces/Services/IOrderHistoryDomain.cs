﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;
using Moviq.Interfaces.Repositories;

namespace Moviq.Interfaces.Services
{
    public interface IOrderHistoryDomain
    {
        IRepository<IOrderHistory> Repo { get; set; }
    }
}
