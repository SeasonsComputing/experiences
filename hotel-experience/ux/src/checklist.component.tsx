import React, { Component, useState } from 'react';
import {
  LoadingState, CoreState, CoreProps,
  LoadingView, ErrorView,
  SpaceHeader, SpaceFooter
} from './core.component';
import {
  Checklist, Section, SectionType,
  Item, ActivityStatus,
  ActivityTuple, Activity
} from './facility.domain';
import { FacilityApi } from './facility.api';

import DoNotDisturb from './tapwow-dnd-icon.svg';
import './app.css';

type ActivitySubmit = (activity: Activity) => void;
type CheckedChange = (key: string, value: string) => void;

type ChecklistProps = CoreProps & {
  listId: string;
  onSubmit?: ActivitySubmit;
};

type ChecklistState = CoreState & {
  list: Checklist;
  activity: Activity;
};

type ChecklistSectionProps = CoreProps & {
  section: Section;
  onSubmit?: ActivitySubmit;
  onChange?: CheckedChange;
};

type ChecklistItemProps = ChecklistSectionProps & {
  item: Item;
};

export class ChecklistView extends Component<ChecklistProps, ChecklistState> {
  state: ChecklistState = {
    loading: LoadingState.initiated,
    list: {
      id: '',
      label: '',
      sections: []
    },
    activity: {
      facilityId: '',
      spaceId: '',
      listId: '',
      tagId: '',
      deviceId: '',
      start: new Date(),
      finish: new Date(),
      status: ActivityStatus.completed,
      actions: {}
    }
  };

  async componentDidMount() {
    try {
      // build activity action keys
      const list: Checklist = await FacilityApi.getChecklist(this.props.listId);
      const actions: ActivityTuple = {};
      list.sections.map(s => s.items.map(i => actions[`${s.id}/${i.id}`] = 'off'));

      this.setState({
        loading: LoadingState.done,
        list,
        activity: {
          facilityId: this.props.facility.id,
          spaceId: this.props.space.id,
          listId: this.props.listId,
          tagId: this.props.context.tagId,
          deviceId: this.props.context.deviceId,
          start: new Date(),
          finish: new Date(),
          status: ActivityStatus.initiated,
          actions
        }
      });
    } catch (e) {
      this.setState({ loading: LoadingState.error });
      console.error(e);
    }
  }

  onListSubmit() {
    const activity = this.state.activity;
    activity.finish = new Date();
    activity.status = this.props.space.dnd ? ActivityStatus.dnd : ActivityStatus.completed;
    this.setState({ activity });
    this.props.onSubmit && this.props.onSubmit(activity);
  }

  onListChange(key: string, value: string) {
    const activity = this.state.activity;
    activity.actions[key] = value;
    this.setState({ activity });
  }

  renderTitle() {
    document.title = `${this.state.list.label} - ${this.props.space.label} - ${this.props.facility.label}`;
  }

  renderFormChecklist() {
    return (
      this.state.list.sections.map(s => (
        <ChecklistSectionView
          key={s.id}
          context={this.props.context}
          facility={this.props.facility}
          space={this.props.space}
          section={s}
          onChange={(k, v) => this.onListChange(k, v)} />
      ))
    );
  }

  renderFormDoNotDisturb() {
    return (
      <div className='Checklist-section'>
        <div className='Checklist-dnd-container'>
          <img src={DoNotDisturb} alt='#' width='40' height='40' />
          <h3>Do Not Disturb</h3>
          <label>
            <p>
              The guests of <strong>{this.props.space.label}</strong> have
              requested not to be disturbed.
            </p>
            <p>
              Staff must register their attempt to enter by
              clicking <strong>Complete</strong> below.
              Please do not disrupt guests.
            </p>
          </label>
        </div>
      </div>
    );
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
              <form className='Checklist-form' onSubmit={e => { this.onListSubmit(); e.preventDefault() }}>
                <div className='Checklist-title'>
                  <h2>{this.state.list.label}</h2>
                  <p>{this.state.list.introduction}</p>
                  {this.props.space.dnd ? null : <p className='warning'>{this.state.list.warning}</p>}
                </div>
                {this.props.space.dnd ? this.renderFormDoNotDisturb() : this.renderFormChecklist()}
                <div className='Checklist-confirmation'>
                  <button className='Checklist-button'>Complete</button>
                </div>
              </form>
            </div>
            <SpaceFooter
              context={this.props.context}
              facility={this.props.facility}
              space={this.props.space} />
          </div >
        );
      default:
        console.error(`invalid state loading=${this.state.loading}`);
        return null;
    }
  }
}

function ChecklistSectionView(props: ChecklistSectionProps) {
  switch (props.section.type) {
    case SectionType.completedList:
      if (props.space.dnd) return null;
      return (
        <div className='Checklist-section'>
          <div className='Checklist-section-title'>
            <h3>{props.section.label}</h3>
          </div>
          <div className='Checklist-field'>
            <label></label>
            <span className='Checklist-completedList-header'>Completed</span>
          </div>
          {
            props.section.items.map(i => (
              <ChecklistItemView
                key={i.id}
                context={props.context}
                facility={props.facility}
                space={props.space}
                section={props.section}
                item={i}
                onChange={props.onChange} />
            ))
          }
        </div>
      );
    case SectionType.rangeList:
      if (props.space.dnd) return null;
      return (
        <div className='Checklist-section'>
          <div className='Checklist-section-title'>
            <h3>{props.section.label}</h3>
          </div>
          <div className='Checklist-field'>
            <label></label>
            {
              [0, 1, 2, 3, 4].map(i => (
                <span key={i} className='Checklist-rangeList-header'>{i}</span>
              ))
            }
          </div>
          {
            props.section.items.map(i => (
              <ChecklistItemView
                key={i.id}
                context={props.context}
                facility={props.facility}
                space={props.space}
                section={props.section}
                item={i}
                onChange={props.onChange} />
            ))
          }
        </div>
      );
    default:
      console.error(`invalid item type=${props.section.type}`);
      return null;
  }
}

function ChecklistItemView(props: ChecklistItemProps) {
  const [fieldClass, setFieldClass] = useState('Checklist-field');
  const id = `${props.section.id}/${props.item.id}`;
  switch (props.section.type) {
    case SectionType.completedList:
      return (
        <div
          className={fieldClass}
          onMouseEnter={() => { setFieldClass('Checklist-field hover') }}
          onMouseLeave={() => { setFieldClass('Checklist-field') }}
        >
          <label>{props.item.label}</label>
          <input
            className='Checklist-input'
            name={id}
            id={id}
            key={id}
            type='checkbox'
            onChange={e => props.onChange && props.onChange(e.target.id, e.target.value)}
          />
        </div>
      );
    case SectionType.rangeList:
      return (
        <div
          className={fieldClass}
          onMouseEnter={() => { setFieldClass('Checklist-field hover') }}
          onMouseLeave={() => { setFieldClass('Checklist-field') }}
        >
          <label>{props.item.label}</label>
          {
            [0, 1, 2, 3, 4].map(i => (
              <input
                className='Checklist-input'
                name={id}
                id={id}
                key={id + i}
                type='radio'
                value={i}
                required
                onChange={e => props.onChange && props.onChange(e.target.id, e.target.value)}
              />
            ))
          }
        </div>
      );
    default:
      console.error(`invalid item type=${props.section.type}`);
      return null;
  }
}
