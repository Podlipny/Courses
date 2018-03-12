using System;
using System.Collections.Generic;
using System.Linq;
using GeoLib.Core;

namespace GeoLib.Client.Entities
{
    public class State : ObjectBase
    {
        int _StateId;
        string _Abbreviation;
        string _Name;
        bool _IsPrimaryState;

        public int StateId
        {
            get { return _StateId; }
            set
            {
                if (_StateId != value)
                {
                    _StateId = value;
                    OnPropertyChanged();
                }
            }
        }

        public string Abbreviation
        {
            get { return _Abbreviation; }
            set
            {
                _Abbreviation = value;
                OnPropertyChanged();
            }
        }

        public string Name
        {
            get { return _Name; }
            set
            {
                if (_Name != value)
                {
                    _Name = value;
                    OnPropertyChanged();
                }
            }
        }

        public bool IsPrimaryState
        {
            get { return _IsPrimaryState; }
            set
            {
                if (_IsPrimaryState != value)
                {
                    _IsPrimaryState = value;
                    OnPropertyChanged();
                }
            }
        }
    }
}
