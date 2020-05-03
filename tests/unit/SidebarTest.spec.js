import { mount } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar';
import data from './data.json';

describe('Sidebar', () => {
  const wrapper = mount(Sidebar, {
    propsData: { data },
  });

  it('renders Category dropdown filter with option "hospitality"', () => {
    expect(wrapper.html()).toContain('Category</label>');
    expect(wrapper.html()).toContain('<option disabled="disabled" value="">-- Please select --</option>');
    expect(wrapper.html()).toContain('<option value="hospitality">hospitality</option>');
  });

  it('renders Ownership switch filter with option "private"', () => {
    expect(wrapper.html()).toContain('Ownership</legend>');
    expect(wrapper.html()).toContain('<span>private</span></label>');
  });

  it('renders Development Type switch filter with options "addition" and "renovation"', () => {
    expect(wrapper.html()).toContain('Development Type</legend>');
    expect(wrapper.html()).toContain('<span>addition</span></label>');
    expect(wrapper.html()).toContain('<span>renovation</span></label>');
  });

  it('renders Status switch filter with option "possible"', () => {
    expect(wrapper.html()).toContain('Status</legend>');
    expect(wrapper.html()).toContain('<span>possible</span></label>');
  });

  it('Development Type filter first option click should emit results with 1 object from data', async () => {
    const button = wrapper.find('#dev_type-filter-group label:first-of-type');
    await button.trigger('click');
    expect(wrapper.emitted().results[0][0][0]['Project ID']).toEqual(data[0].properties.project['Project ID']);
  });
});
