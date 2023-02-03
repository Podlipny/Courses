using System;
using System.Collections.Generic;
using System.Linq;
using GeoLib.Business.Entities;
using GeoLib.Core;

namespace GeoLib.Data
{
    public interface IStateRepository : IDataRepository<State>
    {
        State Get(string abbrev);
        IEnumerable<State> Get(bool primaryOnly);
    }
}
