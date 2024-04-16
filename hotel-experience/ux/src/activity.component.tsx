import React, { Component } from 'react';
import {
  LoadingState, CoreState, CoreProps,
  LoadingView, ErrorView,
  SpaceHeader, SpaceFooter
} from './core.component';
import { Checklist, Activity, ActivityStatus } from './facility.domain';
import { FacilityApi } from './facility.api';

import ActivityCompleted from './activity/activity-completed.svg';
import ActivityDenied from './activity/activity-denied.svg';
import ActivityUserEmpty from './activity/activity-user-empty.svg';
import './app.css';

type ActivityProps = CoreProps & {
  listId: string;
};

type ActivityState = CoreState & {
  list: Checklist;
  history: Activity[];
  fields: string[];
};

export class ActivityView extends Component<ActivityProps, ActivityState> {
  state: ActivityState = {
    loading: LoadingState.initiated,
    list: {
      id: '',
      label: '',
      sections: []
    },
    history: [],
    fields: []
  };

  async componentDidMount() {
    try {
      // fetch list and activity
      const list: Checklist = await FacilityApi.getChecklist(this.props.listId);
      const history: Activity[] = await FacilityApi.getHistory({
        'spaceId': this.props.space.id,
        'listId': this.props.listId
      });

      // build activity field set
      const fields: string[] = [];
      list.sections.map(s => s.items.map(i => fields.push(`${s.id}/${i.id}`)));

      this.setState({
        loading: LoadingState.done,
        list,
        history,
        fields
      });
    } catch (e) {
      this.setState({ loading: LoadingState.error });
      console.error(e);
    }
  }

  renderTitle() {
    document.title = `${this.state.list.label} Report - ${this.props.space.label} - ${this.props.facility.label}`;
  }

  renderDate(when: Date) {
    return (<span>{new Date(when).toLocaleDateString()}</span>);
  }

  renderTime(when: Date) {
    return (<span className='nowrap'>{new Date(when).toLocaleTimeString()}</span>);
  }

  onActivityActions(a: Activity) {
  }

  render() {
    switch (this.state.loading) {
      case LoadingState.initiated:
        return (<LoadingView />);
      case LoadingState.error:
        return (<ErrorView />);
      case LoadingState.done:
        this.renderTitle();
        return (
          <div className='App'>
            <div className='App-full-height'>
              <SpaceHeader
                context={this.props.context}
                facility={this.props.facility}
                space={this.props.space} />
              <div className='Activity-container'>
                <div className='Checklist-title'>
                  <h2>{this.state.list.label} Report</h2>
                </div>
                {
                  this.state.history.map((a, i) => (
                    <div
                      className='Activity-data-card'
                      key={i}
                      onClick={() => this.onActivityActions(a)}
                      onTouchStart={() => this.onActivityActions(a)}
                    >
                      <img
                        src={ActivityUserEmpty}
                        alt='#' width='40' height='40' />
                      <div className='Activity-data-fields'>
                        <div className='Activity-data-row'>
                          <span className='Activity-data-title'>{this.renderDate(a.start)}</span>
                        </div>
                        <div className='Activity-data-row'>
                          <span className='Activity-data-value'>In: {this.renderTime(a.start)}</span>
                          &nbsp;&nbsp;
                          <span className='Activity-data-value'>Out: {this.renderTime(a.finish)}</span>
                        </div>
                      </div>
                      <img
                        src={a.status === ActivityStatus.completed ? ActivityCompleted : ActivityDenied}
                        alt='#' width='20' height='20' />
                    </div>
                  ))
                }
              </div>
            </div>
            <SpaceFooter
              context={this.props.context}
              facility={this.props.facility}
              space={this.props.space} />
          </div>
        );
      default:
        console.error(`invalid state loading=${this.state.loading}`);
        return null;
    }
  }
}
